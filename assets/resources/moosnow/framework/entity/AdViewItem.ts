import EntityLogic from "./EntityLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdViewItem extends EntityLogic {


    @property(cc.Sprite)
    public logo: cc.Sprite = null;

    @property(cc.Label)
    public title: cc.Label = null;

    @property(cc.Sprite)
    public animLogo: cc.Sprite = null;

    @property(cc.Sprite)
    public nameBg: cc.Sprite = null;


    @property
    public changeView: boolean = false;


    private _isClip: boolean = false;
    private _update: number = 0;
    private _clipIdx: number = 0;
    private _updateLimit: number = 5;

    constructor() {
        super();
    }

    private mAdItem: moosnowAdRow;
    public start() {
        this.logo.node.on(cc.Node.EventType.TOUCH_END, this.onClickAd, this)
    }

    private onClickAd() {
        let openAd = { ...this.mAdItem }
        if (this.changeView) {
            let nextAd = this.findNextAd();
            moosnow.event.sendEventImmediately(moosnow.PLATFORM_EVENT.AD_VIEW_REFRESH, {
                current: openAd,
                next: nextAd
            })
            let callback = this.mAdItem.onCancel
            console.log('回调函数', !!callback)
            this.refreshImg({ ...nextAd, onCancel: callback });
        }
        moosnow.platform.navigate2Mini(openAd, () => { }, () => {
            if (this.mAdItem.onCancel)
                this.mAdItem.onCancel();
        })
    }

    private findNextAd(): moosnowAdRow {
        if (!this.LogicData.source)
            return null
        if (!this.LogicData.showAppId)
            return null
        for (let i = 0; i < this.LogicData.source.length; i++) {
            let isShow = false;
            for (let j = 0; j < this.LogicData.showAppId.length; j++) {
                if (this.LogicData.showAppId[j].appid == this.LogicData.source[i].appid) {
                    isShow = true;
                }
            }
            if (!isShow) {
                return this.LogicData.source[i];
            }
        }
        return null;
    }

    private onAdViewChange(e) {
        let { current, next } = e;
        for (let i = 0; i < this.LogicData.showAppId.length; i++) {
            if (current.appid == this.LogicData.showAppId[i]) {
                this.LogicData.showAppId[i] = next.appid;
            }
        }
        for (let i = 0; i < this.LogicData.source.length; i++) {
            if (next.appid == this.LogicData.source[i].appid) {
                this.LogicData.source.splice(i, 1)
                this.LogicData.source.push(current);
                break;
            }
        }

        // console.log('changeView showAppId ', this.LogicData.showAppId, ' source ', this.LogicData.source)
    }

    public onShow() {
        if (this.LogicData.onCancel) {
            console.log('ad view item ', this.LogicData)
        }
        if (this.changeView) {
            moosnow.event.addListener(moosnow.PLATFORM_EVENT.AD_VIEW_REFRESH, this, this.onAdViewChange)
        }
    }

    public onHide() {
        this.mAdItem && this.mAdItem.onCancel = null;
        moosnow.event.removeListener(moosnow.PLATFORM_EVENT.AD_VIEW_REFRESH, this);
    }



    public willShow(cell: moosnowAdRow) {
        super.willShow(cell);
        this.mAdItem = cell;
        cc.loader.load(cell.img, (err, tex) => {
            var spriteFrame = new cc.SpriteFrame(tex);
            this.logo.spriteFrame = spriteFrame;
        })
        if (this.title)
            this.title.string = (cell.title);
    }




    public refreshImg(cell: moosnowAdRow) {
        this.mAdItem = cell;
        cc.loader.load(cell.img, (err, tex) => {
            var spriteFrame = new cc.SpriteFrame(tex);
            this.logo.spriteFrame = spriteFrame;
        })
        if (this.title)
            this.title.string = (cell.title);
    }


    // update (dt) {}
}
