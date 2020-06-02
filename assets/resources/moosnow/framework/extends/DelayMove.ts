const { ccclass, property } = cc._decorator;

@ccclass
export default class DelayMove extends cc.Component {



    @property(cc.Node)
    moveNode: cc.Node = null;

    @property
    moveDis: number = -100;

    @property
    showBanner: boolean = true;

    onEnable() {
        // moosnow.delay.DelayMove.move(this.moveNode, this.moveDis, this.showBanner)
    }


}