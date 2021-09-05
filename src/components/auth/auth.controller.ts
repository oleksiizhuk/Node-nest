import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Get,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../user/dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import SignInDto from "./dto/signIn.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/refreshToken")
  refreshToke(@Headers() headers: any) {
    const { authorization } = headers;
    return this.authService.refreshToken(authorization.split(" ")[1]);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.email.email);
  }

  @UseGuards(AuthGuard("local"))
  @Post("/signIn")
  signIn(@Body() user: SignInDto) {
    return this.authService.singIn(user);
  }

  @UseGuards(AuthGuard("local"))
  @Post("/signUp")
  signUp(@Body() user: UserDto) {
    return this.authService.signUp(user);
  }
}
