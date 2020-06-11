// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class respawnForm extends UIForm {

    @property(cc.Node)
    timeoutContinue: cc.Node = null;

    @property(cc.Node)
    failContinue: cc.Node = null;

    @property(cc.Node)
    btnHome: cc.Node = null;

    @property(cc.Node)
    timeoutContainer: cc.Node = null;

    @property(cc.Node)
    failContainer: cc.Node = null;


    public isMask: boolean = true;

    willShow(data) {
        super.willShow(data);

        this.timeoutContainer.active = !!data.timeout
        this.failContainer.active = !!!data.timeout

        this.btnHome.active = false;

        this.unschedule(this.onShowHomeButton);
        this.schedule(this.onShowHomeButton, 1.5);


        this.timeoutContinue.on(cc.Node.EventType.TOUCH_END, this.onContinue, this)
        this.failContinue.on(cc.Node.EventType.TOUCH_END, this.onContinue, this)
        this.btnHome.on(cc.Node.EventType.TOUCH_END, this.on2Home, this)
    }
    willHide() {
        this.timeoutContinue.off(cc.Node.EventType.TOUCH_END, this.onContinue, this)
        this.failContinue.off(cc.Node.EventType.TOUCH_END, this.onContinue, this)
        this.btnHome.off(cc.Node.EventType.TOUCH_END, this.on2Home, this)
        moosnow.platform.hideBanner();
    }

    onShow() {
        this.node.zIndex = 7;
        moosnow.form.showAd(moosnow.AD_POSITION.CENTER | moosnow.AD_POSITION.MASK, () => { }, 6)
        moosnow.platform.pauseRecord();
    }

    private onShowHomeButton() {
        this.btnHome.active = true;
    }

    private closeForm(cb) {
        moosnow.ui.hideUIForm(UIForms.RespawnForm, null, cb)
    }
    private onContinue() {
        moosnow.platform.resumeRecord();
        moosnow.platform.showVideo((res) => {
            if (res == moosnow.VIDEO_STATUS.END) {
                moosnow.ui.hideUIForm(UIForms.RespawnForm, null)
            }
            else if (res == moosnow.VIDEO_STATUS.NOTEND) {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
            }
            else {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
            }
        })



    }
    private on2Home() {

        this.closeForm(() => {
            moosnow.platform.stopRecord(() => {

                //回到首页点击

            });
        })
    }
}
