import {DealershipType} from "../types/DealershipType.js";
import {userService} from "../services/user.service.js";
import {userPresenter} from "./user.presenter.js";
import {DealershipQueryType} from "../types/QueryType.js";

class DealershipPresenter{
    public async list(dealerships: DealershipType[],  total: number, query: DealershipQueryType){
        return {
            data: await Promise.all(dealerships.map(this.res)),
            total,
            ...query
        }
    }

    public async res(dealership: DealershipType){
        const user = await userService.get(dealership.owner_id)
        return {
            id: dealership._id,
            name: dealership.name,
            description: dealership.description,
            logo: dealership.logo ?? null,
            address: dealership.address,
            phone: dealership.phone,
            email: dealership.email,
            owner: userPresenter.publicRes(user),
            website: dealership.website,
            is_verified: dealership.is_verified,
            rating: dealership.rating,
        }
    }

    public async userRes(dealership: DealershipType){
        return {
            id: dealership._id,
            name: dealership.name,
            description: dealership.description,
            logo: dealership.logo ?? null
        }
    }
}

export const dealershipPresenter = new DealershipPresenter()