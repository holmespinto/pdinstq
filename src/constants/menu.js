const MENU_ITEMS = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: false,
        icon: 'uil-home-alt',
        badge: { variant: 'success', text: '2' },
        children: [
            { key: 'ds-inventario', label: 'Inventario', url: '/dashboard/inventario', parentKey: 'dashboards' },
            { key: 'ds-usuarios', label: 'Usuarios', url: '/dashboard/usuarios', parentKey: 'dashboards' },
        ],
    },

    { key: 'apps', label: 'Referencias', isTitle: true },
    {
        key: 'apps-referencias',
        label: 'Referencias',
        isTitle: false,
        icon: 'uil-store',
        children: [
            {
                key: 'referencias-products',
                label: 'Referencias',
                url: '/apps/referencias/referencias',
                parentKey: 'apps-referencias',
            }],
    },
    ];

export default MENU_ITEMS;
