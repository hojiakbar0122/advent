import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            throw new UnauthorizedException({message:"Token topilmadi"})
        }

        const [bearer, token] = authHeader.split(" ")
        if(bearer!=="Bearer" || !token){
            throw new UnauthorizedException({message:"Bearer, Token aniqlanmadi"})
        }

        let user:any
        try {
            
            user = this.jwtService.decode(token)
        } catch (error) {
            throw new UnauthorizedException({
                message:"Ruxsat etilmagan",
                error:error
            })
        }
        req.user = user
        
        
        return true
    }
}