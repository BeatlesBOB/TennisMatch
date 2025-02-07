import { Body, Controller, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { PointsMatchDto } from './dto/winner-match.dto';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  winner(@Body() pointsMatchDto: PointsMatchDto) {
    return this.matchService.calculateMatchResult(pointsMatchDto);
  }
}
