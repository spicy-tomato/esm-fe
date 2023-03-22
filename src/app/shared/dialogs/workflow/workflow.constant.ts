import {
  ConnectorModel,
  NodeModel,
  PointPortModel,
  TextStyleModel,
} from '@syncfusion/ej2-angular-diagrams';

const portLeft: PointPortModel = {
  id: 'portLeft',
  offset: { x: 0, y: 0.5 },
};
const portTop: PointPortModel = {
  id: 'portTop',
  offset: { x: 0.5, y: 0 },
};
const portRight: PointPortModel = {
  id: 'portRight',
  offset: { x: 1, y: 0.5 },
};
const portBottom: PointPortModel = {
  id: 'portBottom',
  offset: { x: 0.5, y: 1 },
};
const style: TextStyleModel = {
  fontSize: 14,
};

export const WORKFLOW_NODES: NodeModel[] = [
  {
    id: 'swimlane',
    height: 490,
    width: 1260,
    shape: {
      type: 'SwimLane',
      orientation: 'Horizontal',
      header: {
        annotation: {
          content: 'QUY TRÌNH KỲ THI',
          style: { fontSize: 20 },
        },
        height: 60,
      },
      lanes: [
        {
          id: 'stack-canvas-exam',
          header: {
            annotation: { content: 'Phòng khảo thí', style },
            width: 60,
          },
          height: 100,
          children: [
            {
              id: '0-idle',
              annotations: [{ content: 'Bắt đầu', style }],
              margin: { left: 60, top: 25 },
              height: 60,
              width: 80,
              ports: [portRight],
            },
            {
              id: '1-setup',
              annotations: [{ content: 'Cài đặt', style }],
              margin: { left: 265, top: 25 },
              height: 60,
              width: 80,
              ports: [portLeft, portRight],
            },
            {
              id: '2-assign-faculty',
              annotations: [{ content: 'Phân số lượng CBCT cho khoa', style }],
              margin: { left: 440, top: 25 },
              height: 60,
              width: 230,
              ports: [portLeft, portBottom],
            },
            {
              id: '5-assign-room',
              annotations: [{ content: 'Phân CBCT vào ca thi', style }],
              margin: { left: 700, top: 25 },
              height: 60,
              width: 170,
              ports: [portBottom, portRight],
            },
            {
              id: '7-handover',
              annotations: [{ content: 'Bàn giao bài thi', style }],
              margin: { left: 1040, top: 25 },
              height: 60,
              width: 120,
              ports: [portBottom],
            },
          ],
        },
        {
          id: 'stack-canvas-faculty-head',
          header: {
            annotation: { content: 'Trưởng khoa', style },
            width: 60,
          },
          height: 110,
          children: [
            {
              id: '3-assign-department',
              annotations: [
                { content: 'Phân số lượng CBCT cho bộ môn', style },
              ],
              margin: { left: 440, top: 35 },
              height: 60,
              width: 230,
              ports: [portTop, portBottom],
            },
          ],
        },
        {
          id: 'stack-canvas-department-head',
          header: {
            annotation: { content: 'Trưởng bộ môn', style },
            width: 60,
          },
          height: 110,
          children: [
            {
              id: '4-assign-teacher',
              annotations: [
                { content: 'Phân CBCT cho các nhóm ca thi', style },
              ],
              margin: { left: 440, top: 35 },
              height: 60,
              width: 230,
              ports: [portTop, portRight],
            },
          ],
        },
        {
          id: 'stack-canvas-invigilator',
          header: {
            annotation: { content: 'Giảm thị', style },
            width: 60,
          },
          height: 110,
          children: [
            {
              id: '6-exam',
              annotations: [{ content: 'Coi thi', style }],
              margin: { left: 900, top: 25 },
              height: 60,
              width: 90,
              ports: [portTop, portRight],
            },
          ],
        },
      ],
    },
  },
];

export const WORKFLOW_CONNECTORS: ConnectorModel[] = [
  {
    id: 'connector1',
    sourceID: '0-idle',
    targetID: '1-setup',
    annotations: [{ content: 'Nhập dữ liệu', style: { fill: 'white' } }],
  },
  {
    id: 'connector2',
    sourceID: '1-setup',
    targetID: '2-assign-faculty',
    annotations: [{ content: 'Xác nhận', style: { fill: 'white' } }],
  },
  {
    id: 'connector3',
    sourceID: '2-assign-faculty',
    targetID: '3-assign-department',
    annotations: [{ content: 'Xác nhận', style: { fill: 'white' } }],
  },
  {
    id: 'connector4',
    sourceID: '3-assign-department',
    targetID: '4-assign-teacher',
    annotations: [{ content: 'Xác nhận', style: { fill: 'white' } }],
  },
  {
    id: 'connector5',
    sourceID: '4-assign-teacher',
    targetID: '5-assign-room',
    annotations: [{ content: 'Xác nhận', style: { fill: 'white' } }],
    sourcePortID: 'portRight',
  },
  {
    id: 'connector6',
    sourceID: '5-assign-room',
    targetID: '6-exam',
    annotations: [{ content: 'Xác nhận', style: { fill: 'white' } }],
    sourcePortID: 'portRight',
  },
  {
    id: 'connector7',
    sourceID: '6-exam',
    targetID: '7-handover',
    annotations: [{ content: 'Kết thúc', style: { fill: 'white' } }],
    sourcePortID: 'portRight',
  },
];
