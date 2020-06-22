

import UIForm from "../ui/UIForm";
import EntityLogic from "./EntityLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InviteBox extends EntityLogic {

    @property(cc.Node)
    logo: cc.Node = null;

    @property(cc.Label)
    gameName: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    @property(cc.Node)
    btnCancel: cc.Node = null;


    willShow(data) {
        moosnow.control.inviteBox.initForm(this);
        moosnow.control.inviteBox.willShow(data);
    }
    onShow() {
        this.node.zIndex = 1000
    }
    willHide(data) {
        moosnow.control.inviteBox.willHide();
    }
}
