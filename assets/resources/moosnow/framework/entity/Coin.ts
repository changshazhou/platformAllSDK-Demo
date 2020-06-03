import EntityLogic from "./EntityLogic";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Coin extends EntityLogic {


    start() {

    }

    onShow(data) {
        this.node.zIndex = 9999;
    }
    // update (dt) {}
}
