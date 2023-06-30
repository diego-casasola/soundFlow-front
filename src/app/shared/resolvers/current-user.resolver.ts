import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ShortUser } from "../interfaces/user.interface";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
    providedIn: 'root',
})
export class CurrentUserResolver implements Resolve<ShortUser | null> {
    constructor(
        private authService: AuthService,
    ) { }
    async resolve(): Promise<ShortUser | null> {
        try {
            const user = await this.authService.getUserById(this.authService.usuario.user_id).toPromise();
            if (!user) {
                throw new Error('User not found');
            }
            this.authService.setCurrentUser(user);
            return user;
        } catch (error) {
            return null;
        }
    }
}