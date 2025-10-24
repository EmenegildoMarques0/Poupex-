export const NAV_LINKS_CLIENT = [
    {
        id: "1",
        href: "/",
        label: "Overview"
    },
    {
        id: "2",
        href: "/costs",
        label: "Gastos",
    },
    {
        id: "3",
        href: "/statistic",
        label: "Estatísticas",
    },
    {
        id: "4",
        href: "/courses",
        label: "Cursos",
    },
]

export const NAV_LINKS_CLIENT_MOBLE = [
    ...NAV_LINKS_CLIENT,
    {
        id: "5",
        href: "/profile",
        label: "Definições de conta"
    }
]

export const NAV_LINKS_DASH = [
    {
        id: "1",
        href: "/dashboard",
        label: "Overview"
    },
    {
        id: "2",
        href: "/dashboard/users",
        label: "Usuários"
    },
    {
        id: "3",
        href: "/dashboard/courses",
        label: "Cursos"
    },
]

export const NAV_LINKS_DASH_MOBLE = [
    ...NAV_LINKS_DASH,
    {
        id: "5",
        href: "/profile",
        label: "Definições de conta"
    }
]