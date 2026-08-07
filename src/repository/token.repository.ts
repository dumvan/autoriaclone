import {TokenCreateInput, TokenWhereInput, TokenWhereUniqueInput} from "../../prisma/src/generated/prisma/models/Token.js";
import {prisma} from "../../prisma/prisma.client.js";
import type { Token } from "../../prisma/src/generated/prisma/client.js";

class TokenRepository{
    public async getByParams(params: TokenWhereInput): Promise<Token | null>{
        return await prisma.token.findFirst({where: params})
    }

    public async create(token: TokenCreateInput): Promise<Token>{
        return await prisma.token.create({data: token})
    }

    public async delete(token: TokenWhereUniqueInput): Promise<void>{
        await prisma.token.delete({where: token})
    }

    public async deleteManyByParams(token: TokenWhereInput): Promise<void>{
        await prisma.token.deleteMany({where: token})
    }

    public async deleteBeforeDate(date: Date): Promise<{count: number}>{
        return await prisma.token.deleteMany({
            where: {
                created_at: {lt: date}
            }
        })
    }

}

export const tokenRepository = new TokenRepository()