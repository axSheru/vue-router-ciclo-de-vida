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
        path: '/starwars',
        name: 'starwars',
        component: () => import(/* webpackChunkName: "StarWarsLayout" */ '@/modules/starwars/layouts/StarWarsLayout' ),
        children: [
            {
                path: 'characters',
                name: 'sw-characters',
                component: () => import(/* webpackChunkName: "Characters" */ '@/modules/starwars/pages/Characters' ),
            },
            {
                path: 'about',
                name: 'sw-about',
                component: () => import(/* webpackChunkName: "AboutStarWars" */ '@/modules/starwars/pages/About' ),
            },
            {
                path: '',
                redirect: { name: 'sw-characters' }
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

//Guard global síncrono.

router.beforeEach( ( to, from , next ) => {
    //console.log({ to, from, next })

    const random = Math.random() * 100
    if ( random > 50 ) {
        console.log( 'Autenticado.' )
        next()
    } else {
        console.log( random, 'Bloqueado por el beforeEach Guard.' )
        next({ name: 'pokemon-home' })
    }
})

export default router