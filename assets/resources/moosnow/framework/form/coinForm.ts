import UIForm from "../../framework/ui/UIForm";

const { ccclass, property } = cc._decorator;
@ccclass

export default class CoinForm extends UIForm {

    willShow(data) {
        moosnow.control.coinForm.willShow(data);
    }

    onShow(data) {
        moosnow.control.coinForm.onShow(data);
    }
}
