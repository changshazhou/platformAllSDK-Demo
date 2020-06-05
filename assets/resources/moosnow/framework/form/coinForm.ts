import UIForm from "../../framework/ui/UIForm";

const { ccclass, property } = cc._decorator;
@ccclass

export default class CoinForm extends UIForm {

    onShow(data) {
        moosnow.control.coinForm.onShow(data);
    }
}
