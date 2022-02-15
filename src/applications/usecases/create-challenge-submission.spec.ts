import { InMemoryChallengeRepository } from "../../../tests/repositories/in-memory-challenges-repository";
import { InMemoryStudentRepository } from "../../../tests/repositories/in-memory-students-repository";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";

import { CreateChallengeSubmission } from "./create-challenge-submission";

describe(`Create challenge submission use case`, () => {
    it(`should be able to create a new challenge submission`, async () => {
        const studentsRepository = new InMemoryStudentRepository();
        const challengesRepository = new InMemoryChallengeRepository();

        const student = Student.create({
            name: 'Patrick',
            email: `doe@example.com`
        });

        const challenge = Challenge.create({
            title: `Challenge 01`,
            instructionUrl: `http://example.com`
        });

        studentsRepository.items.push(student);
        challengesRepository.items.push(challenge);

        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengesRepository
        );
        
        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id
        });

        expect(response).toBeTruthy();
    });
});