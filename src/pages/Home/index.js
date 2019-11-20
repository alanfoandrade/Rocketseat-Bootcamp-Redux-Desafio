import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatPriceBrl } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import {
  HomeContainer,
  ProductList,
  ProductContainer,
  ProductImg,
  ProductTitle,
  ProductValue,
  AddToCartButton,
  ProductAmount,
  ProductAmountText,
  AddToCartButtonText,
} from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPriceBrl(product.price),
    }));

    this.setState({ products: data });
  };

  handleAddToCart = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  renderProduct = ({ item }) => {
    const { cartItems } = this.props;

    return (
      <ProductContainer key={item.id}>
        <ProductImg source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductValue>{item.priceFormatted}</ProductValue>
        <AddToCartButton onPress={() => this.handleAddToCart(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" size={17} color="#fff" />
            <ProductAmountText>{cartItems[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddToCartButtonText>ADICIONAR</AddToCartButtonText>
        </AddToCartButton>
      </ProductContainer>
    );
  };

  render() {
    const { products } = this.state;

    return (
      <HomeContainer>
        <ProductList
          horizontal
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProduct}
        />
      </HomeContainer>
    );
  }
}

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  cartItems: PropTypes.shape().isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  cartItems: state.cart.reduce((cartItems, product) => {
    cartItems[product.id] = product.amount;

    return cartItems;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
