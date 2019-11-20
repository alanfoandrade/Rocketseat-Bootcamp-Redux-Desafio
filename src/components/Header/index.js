import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  HeaderContainer,
  LogoContainer,
  HeaderLogo,
  CartContainer,
  CartItems,
} from './styles';

function Header({ navigation, cartSize }) {
  return (
    <HeaderContainer>
      <LogoContainer onPress={() => navigation.navigate('Home')}>
        <HeaderLogo />
      </LogoContainer>
      <CartContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" size={24} color="#FFF" />
        <CartItems>{cartSize || 0}</CartItems>
      </CartContainer>
    </HeaderContainer>
  );
}

Header.propTypes = {
  cartSize: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
