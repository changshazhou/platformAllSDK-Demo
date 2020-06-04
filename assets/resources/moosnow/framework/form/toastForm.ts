import UIForm from "../../framework/ui/UIForm";
const { ccclass, property } = cc._decorator;
@ccclass
export default class toastForm extends UIForm {

    @property(cc.Node)
    msgText: cc.Node = null;

    constructor() {
        super();
    }


    show(msg: string) {
        this.node.zIndex = 9999;
        this.msgText.getComponent(cc.Label).string = msg;
        this.node.active = true;
        this.node.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.1, 1)
        ))
        this.scheduleOnce(this.hide, 1)
    }
    hide() {
        // Lite.ui.hideUIForm(UIForms.ToastForm, null)
        this.node.active = false;
    }
}
