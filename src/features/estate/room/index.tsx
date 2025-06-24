import "../index.scss";
import { useState } from "react";
import { Card, Row, Col, Image, Radio, Spin } from "antd";
import type { RadioChangeEvent } from "antd/lib";
import roomPic from "@/assets/roomPic.jpg";
import { useGetRoomListQuery } from "../api/estateApi";

function Room() {
    const [imagePreview, setImagePreview] = useState({
        visible: false,
        src: roomPic,
    });
    const [selectedBuildingId, setSelectedBuildingId] = useState<string>("a1");

    const { data: roomList = [], isLoading, isFetching } = useGetRoomListQuery(selectedBuildingId);

    const handleChange = (e: RadioChangeEvent) => {
        setSelectedBuildingId(e.target.value);
    };

    const showImage = (src: string | null) => {
        setImagePreview({
            visible: true,
            src: src || roomPic,
        });
    };

    const handlePreviewClose = () => {
        setImagePreview(prev => ({ ...prev, visible: false }));
    };

    return (
        <div className="room">
            <Image
                width={200}
                style={{ display: 'none' }}
                preview={{
                    visible: imagePreview.visible,
                    src: imagePreview.src,
                    onVisibleChange: (value) => {
                        if (!value) {
                            handlePreviewClose();
                        }
                    },
                }}
            />

            <Card className="mb">
                <Radio.Group defaultValue="a1" optionType="button" buttonStyle="solid" onChange={handleChange}>
                    <Radio.Button value="a1">A1幢寫字樓</Radio.Button>
                    <Radio.Button value="a2">A2幢寫字樓</Radio.Button>
                    <Radio.Button value="b1">B1幢寫字樓</Radio.Button>
                    <Radio.Button value="b2">B2幢寫字樓</Radio.Button>
                    <Radio.Button value="c1">C1幢寫字樓</Radio.Button>
                    <Radio.Button value="c2">C2幢寫字樓</Radio.Button>
                    <Radio.Button value="d1">天匯國際大廈A座</Radio.Button>
                    <Radio.Button value="d2">時代金融廣場</Radio.Button>
                </Radio.Group>
            </Card>

            <Spin spinning={isFetching}>
                <Row gutter={16}>
                    {roomList.map((item) => (
                        <Col span={6} className="item" key={item.roomNumber}>
                            <Card title="房間號" extra={<button onClick={() => showImage(item.src)} className="link-button">戶型圖</button>}>
                                <h1>{item.roomNumber}</h1>
                                <div className="clearfix mt">
                                    <p className="fl">裝修情況：</p>
                                    <p className="fr">{item.decorationType}</p>
                                </div>
                                <div className="clearfix mt">
                                    <p className="fl">房間面積</p>
                                    <p className="fr">{item.area}㎡</p>
                                </div>
                                <div className="clearfix mt">
                                    <p className="fl">出租單價</p>
                                    <p className="fr">{item.unitPrice}元/平/日</p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Spin>
        </div>
    );
}

export default Room;