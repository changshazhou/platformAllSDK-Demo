
import UIForm from "../ui/UIForm";
import EntityLogic from "../entity/EntityLogic";
import AdViewItem from "../entity/AdViewItem";
import Common from "../utils/Common";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AdForm extends UIForm {



    @property(cc.Node)
    public centerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public centerView: cc.ScrollView = null;

    @property(cc.Layout)
    public centerLayout: cc.Layout = null;


    @property(cc.Node)
    public exportContainer: cc.Node = null;

    @property(cc.ScrollView)
    public exportView: cc.ScrollView = null;

    @property(cc.Layout)
    public exportLayout: cc.Layout = null;

    @property(cc.Node)
    public exportClose: cc.Node = null;

    @property(cc.Node)
    public exportMask: cc.Node = null;

    @property(cc.Node)
    public exportCloseTxt: cc.Node = null;

    @property(cc.Node)
    public bannerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public bannerView: cc.ScrollView = null;

    @property(cc.Layout)
    public bannerLayout: cc.Layout = null;


    @property(cc.Node)
    public endContainer: cc.Node = null;

    @property(cc.ScrollView)
    public endView: cc.ScrollView = null;

    @property(cc.Node)
    public endLayout: cc.Node = null;

    @property(cc.Node)
    public floatContainer: cc.Node = null;

    @property(cc.Node)
    public leftContainer: cc.Node = null;

    @property(cc.ScrollView)
    public leftView: cc.ScrollView = null;

    @property(cc.Layout)
    public leftLayout: cc.Layout = null;

    @property(cc.ScrollView)
    public rightView: cc.ScrollView = null;

    @property(cc.Layout)
    public rightLayout: cc.Layout = null;


    @property(cc.Node)
    public sideContainer: cc.Node = null;

    @property(cc.ScrollView)
    public sideView: cc.ScrollView = null;

    @property(cc.Layout)
    public sideLayout: cc.Layout = null;

    @property(cc.Node)
    public btnSideShow: cc.Node = null;

    @property(cc.Node)
    public btnSideHide: cc.Node = null;



    public isMask: boolean = false;
    public isPopEffect: boolean = false;



    private mAdListBannerItem = "adListBannerItem"
    private mAdListCenterItem = "adListCenterItem"
    private mAdListExportItem = "adListExportItem"
    private mAdListLeftItem = "adListLeftItem"
    private mAdFloatLeftItem1 = "adFloatLeftItem1"
    private mAdFloatLeftItem2 = "adFloatLeftItem2"
    private mAdFloatLeftItem3 = "adFloatLeftItem3"
    private mAdListEndItem1 = "adListEndItem"

    constructor() {
        super();
    }

    start() {

    }

    public update(dt) {
        this.onFwUpdate(dt);
    }

    public onShow(data) {
        moosnow.ad.getAd(res => {
            this.initView(this.bannerContainer, this.bannerView, this.bannerLayout, "banner位置", this.mAdListBannerItem);
            this.initView(this.leftContainer, this.leftView, this.leftLayout, "左边侧拉栏", this.mAdListBannerItem);
            this.initView(this.leftContainer, this.rightView, this.rightLayout, "右边侧拉栏", this.mAdListBannerItem);
            this.initView(this.exportContainer, this.exportView, this.exportLayout, "全屏导出", this.mAdListExportItem);
            this.initView(this.centerContainer, this.centerView, this.centerLayout, "中间页导出", this.mAdListExportItem);
            this.initView(this.sideContainer, this.sideView, this.sideLayout, "侧拉栏", this.mAdListBannerItem);

            this.initFiexdView(this.endContainer, this.endLayout, "固定模式的导出", this.mAdListExportItem);


            let points = [];
            let prefabs = [this.mAdFloatLeftItem1, this.mAdFloatLeftItem2, this.mAdFloatLeftItem1, this.mAdFloatLeftItem3]
            this.floatContainer.children.forEach((item, idx) => {
                if (item.name.indexOf('ad') != -1) {
                    points.push({ x: item.x, y: item.y })
                }
            });
            this.initFloatAd(this.floatContainer, prefabs, points)
        })
    }


    private mAdItemList = [];
    public setPosition(source: Array<moosnowAdRow>, position: string = ""): Array<moosnowAdRow> {
        let retValue = Common.deepCopy(source) as [];
        retValue.forEach((item: moosnowAdRow) => {
            item.position = position;
        })
        return retValue;
    }



    public loadAd(entityName: string | cc.Prefab, callback: Function) {
        moosnow.entity.preload(entityName, () => {
            moosnow.ad.getAd((res) => {
                this.mAdData = res;
                if (res.indexLeft.length == 0)
                    return;
                if (callback)
                    callback(res);
            })
        })
    }

    private mScrollVec = [];
    /**
     * 
     * @param scrollView 
     * @param layout 
     * @param positionTag string
     * @param entityName 
     */
    public initView(container: any, scrollView: any, layout: any, position: string, entityName: string | cc.Prefab) {
        if (!entityName) {
            console.warn('entityName is null 无法初始化 ')
            return;
        }
        this.loadAd(entityName, (res) => {

            let source = this.setPosition(res.indexLeft, position);
            source.forEach((item, idx) => {
                let adItemCtl = moosnow.entity.showEntity(entityName, layout.node, item);
                this.mAdItemList.push(adItemCtl);
            })
            if (layout.type == cc.Layout.Type.GRID) {
                if (scrollView.vertical) {
                    this.mScrollVec.push({
                        scrollView,
                        move2Up: false
                    })
                }
                else {
                    this.mScrollVec.push({
                        scrollView,
                        move2Left: false
                    })
                }
            }
            else if (layout.type == cc.Layout.Type.HORIZONTAL) {
                this.mScrollVec.push({
                    scrollView,
                    move2Left: false
                })
            }
            else if (layout.type == cc.Layout.Type.VERTICAL) {
                this.mScrollVec.push({
                    scrollView,
                    move2Up: false
                })
            }
        })
    }



    public addEvent() {
        moosnow.event.addListener(moosnow.PLATFORM_EVENT.AD_VIEW_CHANGE, this, this.onAdChange)
    }
    public removeEvent() {
        moosnow.event.removeListener(moosnow.PLATFORM_EVENT.AD_VIEW_CHANGE, this)
    }

    public onAdChange(data) {

        this.displayChange(data.showAd, data.callback)

        this.onAfterShow(this.mIndex);

    }

    private mIndex: number = 999;
    /**
     * 
     * @param zindex 
     */
    public onAfterShow(zindex: number) {

    }


    /**
      * 
      * @param data 
      */
    public willShow(data) {

        this.mAdItemList = [];
        this.mScrollVec = [];
        this.addEvent();
        if (data)
            this.displayChange(data.showAd, data.callback)
        else
            this.displayChange(moosnow.AD_POSITION.NONE, null)

    }

    private mShowAd = moosnow.AD_POSITION.NONE;
    private mBackCall: Function
    public displayChange(data, callback = null) {
        let curApp = moosnow.getAppPlatform()
        if (moosnow.APP_PLATFORM.WX == curApp || curApp == moosnow.APP_PLATFORM.OPPO) {
            this.mShowAd = data;
            this.displayAd(true)
            this.mBackCall = callback;
        }
        else {
            this.onBack();
        }

    }
    public onBack() {
        if (this.mBackCall) {
            this.mBackCall();
        }
    }


    private mMoveSpeed: number = 2;
    public onFwUpdate(dt) {
        for (let i = 0; i < this.mScrollVec.length; i++) {
            let item = this.mScrollVec[i];
            let scrollView = item.scrollView as cc.ScrollView;
            if (scrollView.isScrolling())
                continue;

            let scrollOffset = scrollView.getMaxScrollOffset();
            let maxH = scrollOffset.y / 2 + 20;
            let maxW = scrollOffset.x / 2 + 20;
            let contentPos = scrollView.getContentPosition() as any;
            if (item.move2Up == true) {
                if (contentPos.y > maxH) {
                    item.move2Up = false;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x, contentPos.y + this.mMoveSpeed))
            }
            else if (item.move2Up == false) {
                if (contentPos.y < -maxH) {
                    item.move2Up = true;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x, contentPos.y - this.mMoveSpeed))
            }
            if (item.move2Left == true) {
                if (contentPos.x > maxW) {
                    item.move2Left = false;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x + this.mMoveSpeed, contentPos.y))
            }
            else if (item.move2Left == false) {
                if (contentPos.x < -maxW) {
                    item.move2Left = true;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x - this.mMoveSpeed, contentPos.y))
            }
        }

    }
    public sideOut() {
        let wxsys = moosnow.platform.getSystemInfoSync();
        let statusBarHeight = 0;
        let notchHeight = 0;
        if (wxsys) {
            statusBarHeight = wxsys.statusBarHeight || 0;
            notchHeight = wxsys.notchHeight || 0;
        }

        this.sideView.node.runAction(cc.sequence(
            cc.moveTo(1, statusBarHeight + notchHeight + this.sideView.node.width + 20, 0),
            cc.callFunc(() => {
                this.btnSideShow.active = false;
                this.btnSideHide.active = true;
            })
        ))
    }

    public sideIn() {
        this.sideView.node.runAction(cc.sequence(
            cc.moveTo(1, 0, 0),
            cc.callFunc(() => {
                this.btnSideShow.active = true;
                this.btnSideHide.active = false;
            })
        ))
    }

    private mEndLogic = [];
    public initFiexdView(container: any, layout: any, position: string, entityName: string | cc.Prefab) {

        this.loadAd(entityName, (res) => {
            if (this.mEndLogic) {
                for (let i = 0; i < this.mEndLogic.length; i++) {
                    moosnow.entity.hideEntity(this.mEndLogic[i], {});
                }
                this.mEndLogic = [];
            }

            let banner = this.setPosition(res.indexLeft, position);
            let endAd: Array<moosnowAdRow> = [];
            let showAppId = []
            for (let i = 0; i < 6; i++) {
                let item = banner.length > i ? banner[i] : banner[0];
                showAppId.push(item.appid)
                endAd.push(item);
            }
            endAd.forEach(item => {
                let adRow = { ...Common.deepCopy(item), showAppId: Common.deepCopy(showAppId), source: Common.deepCopy(banner) }
                let logic = moosnow.entity.showEntity(entityName, layout, adRow)
                this.mEndLogic.push(logic);
                return false;
            })
        })
    }



    public willHide() {
        this.removeEvent();
        this.mAdItemList.forEach(item => {
            moosnow.entity.hideEntity(item, null);
        })
        this.mAdItemList = [];
        this.mScrollVec = [];
    }
    private mFloatIndex = 0;
    private mFloatRefresh = 3;
    private mFloatCache = {};
    private mAdData: moosnowResult;
    /**
     * 
     * @param parentNode 父节点
     * @param prefabs 匹配的预制体
     * @param points 需要显示的坐标点
     */
    public initFloatAd(parentNode, prefabs: Array<string>, points: Array<object>, position: string = "") {
        cc.loader.loadResDir(moosnow.entity.prefabPath, cc.Prefab, () => {
            moosnow.ad.getAd((res: moosnowResult) => {
                this.mAdData = res;

                if (res.indexLeft.length == 0)
                    return;
                let source = [...res.indexLeft];


                prefabs.forEach((prefabName, idx) => {
                    let showIndex = idx;
                    let floatData = source[0];
                    if (showIndex > source.length - 1)
                        showIndex = 0;

                    floatData = source[showIndex];
                    let point = points[idx] as any;
                    let adRow = { ...floatData, position, x: point.x, y: point.y }
                    let logic = moosnow.entity.showEntity(prefabName, parentNode, adRow);
                    this.mFloatCache[idx] = {
                        index: showIndex,
                        logic: logic,
                        onCancel: adRow.onCancel
                    };
                    this.floatAnim((logic as any).node);
                })
                this.updateFloat(Common.deepCopy(res));
                setInterval(() => {
                    this.updateFloat(Common.deepCopy(res));
                }, this.mFloatRefresh * 1000)
            })

        })

    }
    public floatAnim(floatNode) {

    }


    private updateFloat(source) {

        for (let key in this.mFloatCache) {
            let showIndex = this.mFloatCache[key].index;
            let logic = this.mFloatCache[key].logic;
            if (showIndex < source.indexLeft.length - 1)
                showIndex++;
            else
                showIndex = 0;
            this.mFloatCache[key].index = showIndex;

            logic.refreshImg({ ...source.indexLeft[showIndex], onCancel: this.mFloatCache[key].onCancel });

        }


    }
    private hasAd(ad) {
        return (this.mShowAd & ad) == ad;
    }


    private mSecond: number = 3
    private showExportClose() {
        this.mSecond -= 1;
        this.exportCloseTxt.active = true;
        let closeLabel = this.exportCloseTxt.getComponent(cc.Label)
        if (this.mSecond <= 0) {
            this.exportClose.active = true;
            this.exportCloseTxt.active = false;
            this.unschedule(this.showExportClose)
            return;
        }
        closeLabel.string = `剩余${this.mSecond}秒可关闭`


    }


    private displayAd(visible: boolean) {

        this.floatContainer.active = visible && this.hasAd(moosnow.AD_POSITION.FLOAT);

        this.bannerContainer.active = visible && this.hasAd(moosnow.AD_POSITION.BANNER);

        this.centerContainer.active = visible && this.hasAd(moosnow.AD_POSITION.CENTER);

        this.leftContainer.active = visible && this.hasAd(moosnow.AD_POSITION.LEFTRIGHT);

        this.exportMask.active = visible && this.hasAd(moosnow.AD_POSITION.MASK);

        this.sideContainer.active = visible && this.hasAd(moosnow.AD_POSITION.SIDE);

        this.endContainer.active = visible && this.hasAd(moosnow.AD_POSITION.EXPORT_FIXED);

        this.exportClose.active = false;
        this.exportCloseTxt.active = false;

        this.unschedule(this.showExportClose)

        if (this.hasAd(moosnow.AD_POSITION.BACK)) {
            if (this.hasAd(moosnow.AD_POSITION.WAIT)) {
                this.mSecond = 3;
                this.showExportClose();
                this.schedule(this.showExportClose, 1);
            }
            else {
                this.exportClose.active = true;
                this.exportCloseTxt.active = false;
            }
        }
        else {
            this.exportClose.active = false;
            this.exportCloseTxt.active = false;
        }

        this.exportContainer.active = visible && this.hasAd(moosnow.AD_POSITION.EXPORT)
        if (visible && this.hasAd(moosnow.AD_POSITION.EXPORT)) {
            moosnow.http.getAllConfig(res => {
                if (res.exportAutoNavigate == 1) {
                    moosnow.platform.navigate2Mini(this.mAdData.indexLeft[Common.randomNumBoth(0, this.mAdData.indexLeft.length - 1)])
                }
            })
        }

    }

}