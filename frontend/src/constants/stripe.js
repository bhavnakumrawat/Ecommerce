const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_51IQmlSCjUu2unQEACk7oFnFYp0jhHrn4yWwkM5hy9yLhESC9G44o7TJPzhDtktJ1VftNaL2MtDv4OQGivTipiExF00Wb0d8xo2';

export default STRIPE_PUBLISHABLE;
