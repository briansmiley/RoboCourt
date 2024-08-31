import { IGameService as IGameService } from "./interface";

const createHochoApp = async () => {
export const GameService = (): IGameService => ({
    create: async () => {
        return {    
            id: "1234",
            startTime: new Date(),
            caseFacts: {
                trueVerdict: "guilty",
                objectiveFacts: "The defendant was guilty of murder"
            },
            dossier: "The defendant was guilty of murder",
            honchoDefendant: createHochoApp(),
            gameStage: "examination"
        }}}
)
