import { rest } from "msw";

export const handlers = [
  rest.post("/api/combatants/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        combatant: {
          id: 1,
          encounter_id: 1,
          stat_block: null,
          name: "Alodray",
          type: "character",
          armor_class: 15,
          current_hit_points: 12,
          hit_point_maximum: 12,
          temporary_hit_points: 0,
          initiative: 13,
          action: false,
          bonus_action: false,
          status: null,
          death_save_failure: 0,
          death_save_success: 0,
          order: 0,
          reaction: false,
          is_hidden: false,
        },
      })
    );
  }),
];
