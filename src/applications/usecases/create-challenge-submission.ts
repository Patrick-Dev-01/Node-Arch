import { Submission } from "../../domain/entities/submission";

import { ChallengeRepository } from "../repositories/ChallengesRepository";
import { StudentsRepository } from "../repositories/StudentsRepository";

type CreateChallengeSubmissionRequest = {
    studentId: string;
    challengeId: string;
}

export class CreateChallengeSubmission{
    constructor(
        private studentsRepository: StudentsRepository,
        private challengesRepository: ChallengeRepository
    ){}

    async execute({ studentId, challengeId }: CreateChallengeSubmissionRequest){
        const student = await this.studentsRepository.findById(studentId);

        if(!student){
            throw new Error(`Student doesn't exists`);
        }

        const challenge = await this.challengesRepository.findById(challengeId);

        if(!challenge){
            throw new Error(`Challenge doesn't exists`);
        }

        const submission = Submission.create({
            studentId,
            challengeId
        });

        return submission;
    }
}