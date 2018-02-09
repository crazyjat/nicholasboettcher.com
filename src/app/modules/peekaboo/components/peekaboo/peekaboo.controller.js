import angular from "angular";
import Injectable from "helpers/injectable";
import banana from "../../images/banana_for_scale.png";
import dinoNick from "../../images/dino_nick.png";
import adam from "../../images/adam.png";
import bender from "../../images/bender_nick.png";
import cryBaby from "../../images/cry_baby.png";
import duh from "../../images/duh.png";
import horse from "../../images/horsey.png";
import gag from "../../images/nick_gag.png";
import pirate from "../../images/nick_pirate.png";
import baby from "../../images/nickandbaby.png";
import normal from "../../images/normal.png";
import russian from "../../images/russian.png";
import silly from "../../images/silly_hat.png";
import thomas from "../../images/thomas.png";
import wicker from "../../images/wicker_hat.png";

const deps = [
    "$timeout",
    "$element",
    "$location",
    "$scope",
];

export default class PeekABooController extends Injectable {
    constructor() {
        super(...arguments);

        this.images = [ normal, banana, adam, dinoNick, bender, cryBaby, duh, horse, gag, pirate, baby, normal, russian, silly, thomas, wicker, ];
        this.counter = 0;

        this.themes = [
            {
                label: "Photo Frame",
                value: "photo-frame",
                url: "photoframe",
            },
            {
                label: "Pirate Nick",
                value: "pirate-nick",
                url: "piratenick",
            },
            {
                label: "Fly Air Nick",
                value: "fly-air-nick",
                url: "flyairnick",
            },
        ];

        const path = this.$location.path().substr(1);

        for (let i = 0; i < this.themes.length; ++i) {
            if (path === this.themes[i].url) {
                this.themeIndex = i;
                break;
            }
        }
    }

    $onInit() {

    }

    $onDestroy() {

    }

    themeChanged() {
        this.$location.update_path(this.themes[this.themeIndex].url, true);
    }

    getNextImage() {
        const image = this.images[this.counter];
        this.counter = (this.counter === this.images.length - 1) ? 0 : this.counter + 1;
        return image;
    }

    $postLink() {
        const imgEl = document.getElementById("NickImage");
        imgEl.src = this.getNextImage();

        this.$timeout(() => {
            this.$element.addClass("animate animate-start");
            this.$element.on("animationend", (event) => {
                if (event.animationName === "peek-a-boo") {
                    this.$element.removeClass("animate");
                    imgEl.src = this.getNextImage();
                    this.$timeout(() => this.$element.addClass("animate"));
                }
            });
        });
    }
}

PeekABooController.$inject = deps;