import { SpaceshipGenerator } from './SpaceshipGenerator';
import { RandomService } from '../generators/random-service';
import { AlignmentAndAttitudeGenerator } from './AlignmentAndAttitudeGenerator';

export class CentralCastingHeroesForTomorrowHub {
    /**
     * Create a Central Casting Heroes For Tomorrow Service Hub
     */
    constructor(private _spaceship: SpaceshipGenerator, private _alignmentAndAttitude: AlignmentAndAttitudeGenerator) {}
    /**
     * Gets the 866 Spacecraft generator.
     *
     * @readonly
     * @type {SpaceshipGenerator}
     * @memberof CentralCastingHeroesForTomorrowHub
     */
    public get spaceship(): SpaceshipGenerator {
        return this._spaceship;
    }

    /**
     * Gets the 312 Alignment & Attitude generator.
     *
     * @readonly
     * @type {AlignmentAndAttitudeGenerator}
     * @memberof CentralCastingHeroesForTomorrowHub
     */
    public get alignmentAndAttitude(): AlignmentAndAttitudeGenerator {
        return this._alignmentAndAttitude;
    }
}

export class CentralCastingFactory {
    public static createHub(randomService: RandomService = new RandomService()): CentralCastingHeroesForTomorrowHub {
        return new CentralCastingHeroesForTomorrowHub(
            new SpaceshipGenerator(randomService),
            new AlignmentAndAttitudeGenerator(randomService)
        );
    }
}

// const tmp = new CentralCastingFactory();
// const hub = tmp.createHeroesForTomorrow();
// hub.alignmentAndAttitude.generate({
//     events: EventFromTraits[],
//     randomPersonalityTrait: 0
// })
