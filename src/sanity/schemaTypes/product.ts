const menuItem = {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique identifier for the menu item',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the menu item',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image of the menu item',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      description: 'URL-friendly name for SEO',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the menu item',
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount percentage (if any)',
    },
    {
      name: 'stockLevel',
      title: 'Stock Level',
      type: 'number',
      description: 'Current available stock of the item',
    },
    {
      name: 'isVegetarian',
      title: 'Is Vegetarian',
      type: 'boolean',
      description: 'Indicates if the item is vegetarian',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the menu item',
    },
  ],
};

export default menuItem;
