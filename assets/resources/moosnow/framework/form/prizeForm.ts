import UIForm from "../../framework/ui/UIForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class prizeForm extends UIForm {

    @property(cc.Label)
    coinNum: cc.Label = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    public isMask: boolean = true;



    willShow(data) {
        moosnow.control.prizeForm.initForm(this);
        moosnow.control.prizeForm.willShow(data);
    }

    willHide() {
        moosnow.control.prizeForm.willHide();
    }



}
