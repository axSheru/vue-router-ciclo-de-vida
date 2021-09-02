import { createRouter, createWebHashHistory } from 'vue-router';

import NoPageFound from '@/modules/shared/pages/NoPageFound';

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout' ),
        children: [
            {
                path: 'home',
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage' )
            },
            {
                path: 'about',
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage' )
            },
            {
                path: 'pokemonid/:id',
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage' ),
                props: ( route ) => {
                    const id = Number( route.params.id )
                    return isNaN( id ) ? { id: 1 } : { id }
                }
            },
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound' )
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router