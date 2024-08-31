import { z } from "zod";

export const VerdictSchema = z.union([
  z.literal("guilty"),
  z.literal("innocent")
]);
export const GameStageSchema = z.union([
  z.literal("prelude"),
  z.literal("examination"),
  z.literal("verdict")
]);
export const CaseFactsSchema = z.object({
  trueVerdict: VerdictSchema,
  objectiveFacts: z.string()
});
export const HonchoDefendantSchema = z.object({
  defendantAppId: z.string(),
  userId: z.string()
});
export const GameStateSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  caseFacts: CaseFactsSchema,
  dossier: z.string(), //the case summary given to the player at game start
  honchoDefendant: HonchoDefendantSchema,
  gameStage: GameStageSchema
});

export type GameState = z.infer<typeof GameStateSchema>;
