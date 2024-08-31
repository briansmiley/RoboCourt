import { z } from "zod";

export const VerdictSchema = z.union([
  z.literal("guilty"),
  z.literal("innocent")
]);
export type Verdict = z.infer<typeof VerdictSchema>;

export const GameStageSchema = z.union([
  z.literal("prelude"),
  z.literal("examination"),
  z.literal("verdict")
]);
export type GameStage = z.infer<typeof GameStageSchema>;

export const CaseFactsSchema = z.object({
  trueVerdict: VerdictSchema,
  objectiveFacts: z.string()
});
export type CaseFacts = z.infer<typeof CaseFactsSchema>;

export const HonchoDefendantSchema = z.object({
  appId: z.string(),
  userId: z.string(),
  sessionId: z.string()
});
export type HonchoDefendant = z.infer<typeof HonchoDefendantSchema>;

export const GameStateSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  caseFacts: CaseFactsSchema,
  dossier: z.string(), //the case summary given to the player at game start
  honchoDefendant: HonchoDefendantSchema,
  gameStage: GameStageSchema
});
export type GameState = z.infer<typeof GameStateSchema>;
