export const pokemonTypesMock = [
  {
    slot: 2,
    type: {
      name: "flying",
      url: "/api/v2/type/3/",
    },
  },
  {
    slot: 1,
    type: {
      name: "fire",
      url: "/api/v2/type/10/",
    },
  },
]

export const typesMock = {
  edges: [
    {
      node: {
        damage_relations: {
          double_damage_from: [
            {
              name: "rock",
              url: "/api/v2/type/6/",
            },
            {
              name: "electric",
              url: "/api/v2/type/13/",
            },
            {
              name: "ice",
              url: "/api/v2/type/15/",
            },
          ],
          double_damage_to: [
            {
              name: "fighting",
              url: "/api/v2/type/2/",
            },
            {
              name: "bug",
              url: "/api/v2/type/7/",
            },
            {
              name: "grass",
              url: "/api/v2/type/12/",
            },
          ],
          half_damage_from: [
            {
              name: "fighting",
              url: "/api/v2/type/2/",
            },
            {
              name: "bug",
              url: "/api/v2/type/7/",
            },
            {
              name: "grass",
              url: "/api/v2/type/12/",
            },
          ],
          half_damage_to: [
            {
              name: "rock",
              url: "/api/v2/type/6/",
            },
            {
              name: "steel",
              url: "/api/v2/type/9/",
            },
            {
              name: "electric",
              url: "/api/v2/type/13/",
            },
          ],
          no_damage_from: [
            {
              name: "ground",
              url: "/api/v2/type/5/",
            },
          ],
          no_damage_to: [],
        },
        generation: {
          name: "generation-i",
          url: "/api/v2/generation/1/",
        },
        id: 3,
        move_damage_class: {
          name: "physical",
          url: "/api/v2/move-damage-class/2/",
        },
        name: "flying",
      },
    },

    {
      node: {
        damage_relations: {
          double_damage_from: [
            {
              name: "ground",
              url: "/api/v2/type/5/",
            },
            {
              name: "rock",
              url: "/api/v2/type/6/",
            },
            {
              name: "water",
              url: "/api/v2/type/11/",
            },
          ],
          double_damage_to: [
            {
              name: "bug",
              url: "/api/v2/type/7/",
            },
            {
              name: "steel",
              url: "/api/v2/type/9/",
            },
            {
              name: "grass",
              url: "/api/v2/type/12/",
            },
            {
              name: "ice",
              url: "/api/v2/type/15/",
            },
          ],
          half_damage_from: [
            {
              name: "bug",
              url: "/api/v2/type/7/",
            },
            {
              name: "steel",
              url: "/api/v2/type/9/",
            },
            {
              name: "fire",
              url: "/api/v2/type/10/",
            },
            {
              name: "grass",
              url: "/api/v2/type/12/",
            },
            {
              name: "ice",
              url: "/api/v2/type/15/",
            },
            {
              name: "fairy",
              url: "/api/v2/type/18/",
            },
          ],
          half_damage_to: [
            {
              name: "rock",
              url: "/api/v2/type/6/",
            },
            {
              name: "fire",
              url: "/api/v2/type/10/",
            },
            {
              name: "water",
              url: "/api/v2/type/11/",
            },
            {
              name: "dragon",
              url: "/api/v2/type/16/",
            },
          ],
          no_damage_from: [],
          no_damage_to: [],
        },
        generation: {
          name: "generation-i",
          url: "/api/v2/generation/1/",
        },
        id: 10,
        move_damage_class: {
          name: "special",
          url: "/api/v2/move-damage-class/3/",
        },
        name: "fire",
      },
    },
  ],
}
