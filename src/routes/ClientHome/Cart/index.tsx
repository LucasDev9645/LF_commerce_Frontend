import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import * as cartService from "../../../services/cart-service";
import { OrderDTO } from "../../../models/order";
import { ContextCartCount } from "../../../utils/context-cart";

import "./style.css";

const Cart = () => {
  const [cart, setCart] = useState<OrderDTO>(cartService.getCart());
  const { setContextCartCount } = useContext(ContextCartCount);

  const handleClearClick = () => {
    cartService.clearCart();
    const newCart = cartService.getCart();
    setCart(newCart);
    setContextCartCount(newCart.items.length);
  };

  const handleIncreaseItem = (productId: number) => {
    cartService.increaseItem(productId);
    setCart(cartService.getCart());
  };

  const handleDecreaseItem = (productId: number) => {
    cartService.decreaseItem(productId);
    const newCart = cartService.getCart();
    setCart(newCart);
    setContextCartCount(newCart.items.length);
  };

  return (
    <main>
      <section id="cart-container-section" className="dsc-container">
        {cart.items.length === 0 ? (
          <div>
            <h2 className="dsc-section-title dsc-mb20">
              Seu carrinho está vazio!
            </h2>
          </div>
        ) : (
          <div className="dsc-card dsc-mb20">
            {cart.items.map((product) => (
              <div
                key={product.productId}
                className="dsc-cart-item-container dsc-line-bottom"
              >
                <div className="dsc-cart-item-left">
                  <img src={product.imgUrl} alt="Computador" />
                  <div className="dsc-cart-item-description">
                    <h3>{product.name}</h3>
                    <div className="dsc-cart-item-quantity-container">
                      <div
                        onClick={() => handleDecreaseItem(product.productId)}
                        className="dsc-cart-item-quantity-btn"
                      >
                        -
                      </div>
                      <p>{product.quantity}</p>
                      <div
                        onClick={() => handleIncreaseItem(product.productId)}
                        className="dsc-cart-item-quantity-btn"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dsc-cart-item-right">
                  R$ {product.subTotal.toFixed(2)}
                </div>
              </div>
            ))}
            <div className="dsc-cart-total-container">
              <h3>R$ {cart.total.toFixed(2)}</h3>
            </div>
          </div>
        )}

        <div className="dsc-btn-page-container">
          <Link to="/catalog">
            <div className="dsc-btn dsc-btn-blue">Continuar comprando</div>
          </Link>
          <div onClick={handleClearClick} className="dsc-btn dsc-btn-white">
            Limpar carrinho
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
