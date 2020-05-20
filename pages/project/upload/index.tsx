import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../../../components/layout';
import './upload-project.module.less';

import {
  Form,
  Input,
  Select,
  Switch,
  Steps, 
  Upload, 
  Modal,
  Button,
  Tooltip
} from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { Option } = Select;

const UploadProject:React.FunctionComponent = () => {
  useEffect(() => {
    console.log('upload mounted');
  });

  const [currentStep, setStep] = useState<number>(0);
  const [componentSize, setComponentSize] = useState('medium');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [fileList, setFileList] = useState<any[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ]);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  const changeStep = (e:React.MouseEvent<HTMLElement, MouseEvent>, nextStep:boolean) => {

    if(nextStep) {
      setStep(currentStep + 1);
    } else {
      setStep(currentStep - 1);
    }
  }

  const technologies = ['React', 'Angular', 'ASP.NET', 'Node/Express', 'Vue', 'Django','Flask', 'Laravel', 'Ruby on Rails', 'Drupal'];
  const childrenTech = [];
  for (let i = 0; i < technologies.length; i++) {
    childrenTech.push(<Option key={i} value={technologies[i]}>{technologies[i]}</Option>);
  }
  const tags = ['Productivity', 'Fintech', 'Analytics', 'Sports', 'Music', 'Personal'];
  const childrenTags = [];
  for (let i = 0; i < tags.length; i++) {
    childrenTags.push(<Option key={i} value={tags[i]}>{tags[i]}</Option>);
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewTitle(file.name);
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  }

  const handleOnFinish = (values) => {
    console.log('values');
  }

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const customRequest = file => {
			const data= new FormData()
			data.append('file', file.file)
			const config= {
        method: "POST",
        body: data
      }

			fetch('http://localhost:3000/api/image/upload', config).then((res: any) => {
        return res.text();
			}).then(url => {
        file.onProgress(e => console.log(e));
        file.onSuccess(e => console.log(e));
        console.log(fileList)
      }).catch((err: Error) => {
				console.log(err)
			})	
  }
  const renderStepComponent = (step) => {
    if(step === 1) {
        return projectInformation;
    } else if(step === 2) {
        return images;
    } else if(step === 3) {
        return preview;
    } else if(step === 4) {
        return submit;
    }
  }

  const step = currentStep + 1;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const projectInformation =
  <React.Fragment>
    <Form.Item label="Project Name" required>
      <Input />
    </Form.Item>
    <Form.Item label="Tagline" required>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label="Introduction" required>
      <Input.TextArea />
    </Form.Item>
    <Form.Item label="Website" required>
      <Input />
    </Form.Item>
    <Form.Item label="Technologies">
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
      >
        {childrenTech}
      </Select>
    </Form.Item>
    <Form.Item label="Tags">
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
      >
        {childrenTags}
      </Select>
    </Form.Item>
    <Form.Item label={<span>
            Collaboration&nbsp;
            <Tooltip title="Are you interested in collaborating with others?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>}>
      <Switch />
    </Form.Item>
  </React.Fragment>

;

  const images = <div className="clearfix">
  <Upload
    action="http://localhost:3000/api/image/upload"
    listType="picture-card"
    fileList={fileList}
    onPreview={handlePreview}
    onChange={handleUploadChange}
    customRequest={customRequest}
  >
    {fileList.length >= 8 ? null : uploadButton}
  </Upload>
  <Modal
    visible={previewVisible}
    title={previewTitle}
    footer={null}
    onCancel={handleCancel}
  >
    <img alt="example" style={{ width: '100%' }} src={previewImage} />
  </Modal>
</div>;
  const preview = <div>preview</div>;
  const submit = <div>submit</div>;

  return (
    <Layout>
      <div>
        <Head>
          <title>Upload Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        <Steps current={currentStep}>
          <Step title="Project Information" />
          <Step title="Images" />
          <Step title="Preview" />
          <Step title="Submit" />
        </Steps>

        <div className="project-upload-body">
          <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onFinish={handleOnFinish}
          onValuesChange={onFormLayoutChange}
        >

          {renderStepComponent(step)}

        </Form>
          {step > 1 && step < 5 ? 
            <div>
              <Button type="primary" onClick={e => changeStep(e, false)}>Back</Button>
              <Button type="primary" onClick={e => changeStep(e, true)}>Next</Button>
            </div> :
            step === 5 ? 
            <div>
              <Button onClick={e => changeStep(e, false)}>Back</Button>
              <Button type="primary" htmlType="submit">Submit</Button>
            </div> : <Button type="primary" onClick={e => changeStep(e, true)}>Next</Button>
            
            
          }

          </div>
        </main>
      </div>
    </Layout>
  );
};

export default UploadProject;
