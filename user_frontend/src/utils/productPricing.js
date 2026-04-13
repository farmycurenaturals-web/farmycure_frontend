const normalizeVariants = (product) => {
  if (Array.isArray(product?.variants)) {
    if (product.variants[0]?.options) {
      return product.variants
        .map((variant) => ({
          name: String(variant?.name || '').trim(),
          image: String(variant?.image || '').trim(),
          options: Array.isArray(variant?.options)
            ? variant.options
                .map((opt) => ({
                  quantity: String(opt?.quantity || '').trim(),
                  price: Number(opt?.price),
                  stock: Number(opt?.stock || 0)
                }))
                .filter((opt) => opt.quantity && Number.isFinite(opt.price))
            : []
        }))
        .filter((variant) => variant.name && variant.options.length);
    }
    return [
      {
        name: 'default',
        image: '',
        options: product.variants
          .map((variant) => ({
            quantity: String(variant?.quantity || '').trim(),
            price: Number(variant?.price),
            stock: Number(variant?.stock || 0),
            image: String(variant?.image || '').trim()
          }))
          .filter((opt) => opt.quantity && Number.isFinite(opt.price))
      }
    ];
  }

  if (product?.variants && typeof product.variants === 'object') {
    const keys = Object.keys(product.variants);
    if (!keys.length) return [];
    const firstValue = product.variants[keys[0]];
    if (typeof firstValue === 'object' && firstValue !== null) {
      return keys.map((type) => ({
        name: type,
        image: '',
        options: Object.entries(product.variants[type] || {})
          .map(([quantity, price]) => ({ quantity, price: Number(price), stock: 0 }))
          .filter((opt) => opt.quantity && Number.isFinite(opt.price))
      }));
    }
    return [
      {
        name: 'default',
        image: '',
        options: Object.entries(product.variants)
          .map(([quantity, price]) => ({ quantity, price: Number(price), stock: 0 }))
          .filter((opt) => opt.quantity && Number.isFinite(opt.price))
      }
    ];
  }

  return [];
};

const getVariantByType = (product, type = null) => {
  const variants = normalizeVariants(product);
  if (!variants.length) return null;
  if (!type) return variants[0];
  return variants.find((variant) => variant.name === type) || null;
};

export const hasTypeVariants = (product) => normalizeVariants(product).length > 1;

export const getVariantTypes = (product) => normalizeVariants(product).map((variant) => variant.name);

export const getQuantities = (product, type = null) => {
  const variant = getVariantByType(product, type);
  return variant ? variant.options.map((opt) => opt.quantity) : [];
};

export const getPrice = (product, type = null, quantity = null) => {
  const variant = getVariantByType(product, type);
  if (!variant || !quantity) return null;
  const option = variant.options.find((opt) => opt.quantity === String(quantity).trim());
  return option ? option.price : null;
};

export const getStartingPrice = (product) => {
  const variants = normalizeVariants(product);
  const prices = variants.flatMap((variant) => variant.options.map((opt) => opt.price)).filter(Number.isFinite);
  return prices.length ? Math.min(...prices) : product?.price || null;
};

export const getVariantImage = (product, type = null, quantity = null) => {
  const variant = getVariantByType(product, type);
  if (variant?.image) return variant.image;
  if (variant && quantity) {
    const fallback = variant.options.find((opt) => opt.quantity === String(quantity).trim());
    if (fallback?.image) return fallback.image;
  }
  return product?.image || '';
};
