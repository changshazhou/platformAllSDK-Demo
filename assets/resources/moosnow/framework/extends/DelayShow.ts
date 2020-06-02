const { ccclass, property } = cc._decorator;

@ccclass
export default class DelayMove extends cc.Component {

    @property(cc.Node)
    showNode: cc.Node = null;

    @property
    delayTime: number = 3;

    onEnable() {
        moosnow.delay.DelayShow.show(this.showNode, this.delayTime)
    }


}