// eslint-disable-next-line no-shadow
export enum PublicActionsTypes {
  loadAvailableProducts = '[Products] Load available Products',
  loadAvailableProductsSuccess = '[Products] Load available Products Success',
  loadAvailableProductsFailure = '[Products] Load available Products Failure',

  userClientRegister = '[User] Client Register',
  userClientRegisterSuccess = '[User] Register Client Success',
  userClientRegisterFailure = '[User] Register Client Failure',

  addProductToCart = '[Cart] Product Added To Cart',
  addProductToCartSuccess = '[Cart] Product Added To Cart Success',
  addProductToCartFailure = '[Cart] Product Added To Cart Failure',

  removeProductFromCart = '[Cart] Remove Product from Cart',
  removeProductFromCartSuccess = '[Cart] Product removed from Cart Success',
  removeProductFromCartFailure = '[Cart] Product removed from Cart Failure',

  loadClientCart = '[Cart] Load clients card',
  loadClientCardSuccess = '[Cart] Load clients card Success',
  loadClientCardFailure = '[Cart] Load clients card Failure'
}
