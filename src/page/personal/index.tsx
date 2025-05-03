import { Card, Row, Col, Calendar, Avatar, List, Tag, Progress, Badge } from 'antd';
import "./index.scss"

const data = [
    {
        title: 'Ant Design Title 1',
    }
];
export default function Personal() {
    return <div>
        <Row gutter={16}>
            <Col span={6}>
                <Card>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(_item, _index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://randomuser.me/api/portraits/thumb/men/52.jpg`} />}
                                    title={<a href="https://ant.design">趙鐵柱 -運營專員</a>}
                                    description="無論是打工還是生存，都要盡已所能全力以赴，優秀才是常態。"
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Card className="mt">
                    <Calendar fullscreen={false} />
                </Card>
            </Col>

            <Col span={18}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            待處理: <Badge count={4} showZero color="#faad14" />
                        </Card>
                        <Card title="新增賬號申請" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:新入職員工,需要新建user權限賬號</p>
                            <p className="mt">創建人:人力資源部 -劉婷</p>
                            <div className="mt">
                                日期:<Tag>2024-05-02</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="blue">常規</Tag>
                                <Tag color="blue">賬號問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={1} />
                            </div>
                        </Card>
                        <Card title="物業費催繳" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:催促企業盡快繳納</p>
                            <p className="mt">創建人:總裁辦 -王久</p>
                            <div className="mt">
                                日期:<Tag>2024-05-01</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="orange">緊急</Tag>
                                <Tag color="blue">物業問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={1} />
                            </div>
                        </Card>
                        <Card title="充電樁報修" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:C1樓下充電樁損壞,盡快派人維修</p>
                            <p className="mt">創建人:行政部-王偉</p>
                            <div className="mt">
                                日期:<Tag>2024-05-04</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="blue">常規</Tag>
                                <Tag color="blue">物業問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={1} />
                            </div>
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card>
                            處理中:<Badge count={2} showZero color="blue" />
                        </Card>
                        <Card title="通知企業統一試供暖" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:即將供暖，調試閥門</p>
                            <p className="mt">創建人:行政部-王偉</p>
                            <div className="mt">
                                日期:<Tag>2024-05-03</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="blue">常規</Tag>
                                <Tag color="blue">物業問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={34} />
                            </div>
                        </Card>
                        <Card title="賬單沒有審批" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:新一季度財務賬單抓緊審批完成</p>
                            <p className="mt">創建人:總裁辦-張大</p>
                            <div className="mt">
                                日期:<Tag>2024-05-11</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="orange">緊急</Tag>
                                <Tag color="blue">財務問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={65} />
                            </div>
                        </Card>
                        <Card title="車位到期提醒" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:車位續租改為按年收費</p>
                            <p className="mt">創建人:總裁辦-劉婷</p>
                            <div className="mt">
                                日期:<Tag>2024-05-20</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="blue">常規</Tag>
                                <Tag color="blue">賬號問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={47} />
                            </div>
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card>
                            已完成:<Badge count={9} showZero color="green" />
                        </Card>
                        <Card title="文章發布" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:發布招商文章</p>
                            <p className="mt">創建人:網推部-曼曼</p>
                            <div className="mt">
                                日期:<Tag>2024-04-02</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="blue">常規</Tag>
                                <Tag color="blue">運營問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={100} />
                            </div>
                        </Card>
                        <Card title="新增賬號申請" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:新入職員工,需要新建user權限賬號</p>
                            <p className="mt">創建人:人力資源部-劉婷</p>
                            <div className="mt">
                                日期:<Tag>2024-04-11</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="blue">常規</Tag>
                                <Tag color="blue">賬號問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={100} />
                            </div>
                        </Card>
                        <Card title="報修處理" extra={<button type="button" className="link-button">詳情</button>} className="mt">
                            <p>描述:A1幢寫字樓電梯維護</p>
                            <p className="mt">創建人:行政部 -金強</p>
                            <div className="mt">
                                日期:<Tag>2024-04-17</Tag>
                            </div>
                            <div className="mt">
                                <Tag color="orange">常規</Tag>
                                <Tag color="blue">物業問題</Tag>
                            </div>
                            <div className="mt">
                                進度:
                                <Progress percent={100} />
                            </div>
                        </Card>

                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}
