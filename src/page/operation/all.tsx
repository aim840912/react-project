import { Row, Col, Card, Badge, Statistic } from "antd"
import "./index.scss"
function All() {
    return <div>
        <Row gutter={16}>
            <Col span={18}>
                <Card>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="文章總數" value={1588} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="意向客戶(個)" value={235} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="入駐企業(家)" value={766} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="園區用戶(人)" value={6988} />
                        </Col>
                    </Row>
                </Card>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card className="mt">
                            <Card title="待辦事項" extra={<button type="button" className="link-button">更多</button>} >
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="blue" text="合同簽訂待處理" />
                                    <span style={{ color: "#666" }}>2024-01-02</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="blue" text="充電樁維修報修" />
                                    <span style={{ color: "#666" }}>2024-03-12</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="blue" text="空調使用費統一徵收" />
                                    <span style={{ color: "#666" }}>2024-03-22</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="gray" text="租戶物業費催繳" />
                                    <span style={{ color: "#666" }}>2024-04-01</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="gray" text="潛在意向客戶跟訪" />
                                    <span style={{ color: "#666" }}>2024-04-07</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="gray" text="園區保洁注意事項" />
                                    <span style={{ color: "#666" }}>2024-05-02</span>
                                </div>
                            </Card>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="mt">
                            <Card title="最新動態"
                                extra={<button type="button" className="link-button">更多</button>}>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="red" text="同心共建經濟圈，更上層峰開新..." />
                                    <span style={{ color: "#666" }}>2024-01-02</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="red" text="我區十個重大工業投資項目集中..." />
                                    <span style={{ color: "#666" }}>2024-01-02</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="red" text="新能源新政策發布，究竟是好還..." />
                                    <span style={{ color: "#666" }}>2024-01-02</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="gray" text="園區內的事故究竟要如何定責任..." />
                                    <span style={{ color: "#666" }}>2024-04-01</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="gray" text="關於充電樁使用的重要通知，長..." />
                                    <span style={{ color: "#666" }}>2024-04-07</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", lineHeight: "30px" }}>
                                    <Badge color="gray" text="關於充電樁使用的重要通知，長..." />
                                    <span style={{ color: "#666" }}>2024-05-02</span>
                                </div>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Card title="優質企業排名">
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>1.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>2.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>3.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>4.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>5.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>6.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>7.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>8.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>9.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>10.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                    <div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>11.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div><div style={{ lineHeight: "30px", display: "flex", justifyContent: "space-between" }}>
                        <p>12.萬物科技有限公司</p>
                        <p>人數:87人</p>
                        <p>估值:8600(萬元)</p>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
}

export default All
