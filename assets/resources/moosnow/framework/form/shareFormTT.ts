

import UIForms from "../../config/UIForms";
import UIForm from "../../framework/ui/UIForm";
const { ccclass, property } = cc._decorator;

@ccclass
export default class shareFormTT extends UIForm {

    @property(cc.Node)
    btnShare: cc.Node = null;

    @property(cc.Node)
    btnBack: cc.Node = null;


    @property(cc.Label)
    txtCoinNum: cc.Label = null;

    public isMask: boolean = true;

    willShow(data) {
        moosnow.control.shareFormTT.initForm(this)
        moosnow.control.shareFormTT.willShow(data)
    }

    onShow() {
        moosnow.control.shareFormTT.onShow();
    }


}
