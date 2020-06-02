import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import ProjectMain from '../../../components/projects-main';
import Layout from '../../../components/layout';
import './upload-project.module.less';
import {
  Form,
  Input,
  Select,
  Switch,
  Upload, 
  Modal,
  Button,
  Tooltip
} from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ApiService } from '../../../lib/apiService';

interface IFormLayoutChange {
  size: string;
}

interface ISelectChange {
  value: string[];
}

interface IUploadChange {
  fileList: string[];
}

interface IHandleRemove {
  info: {uid: string};
  fileList: [{uid: string}];
}

interface IHandlePreview {
  url: string;
  preview: string;
  originFileObj: Blob;
  name: string;
}

interface IFields {
  name: string;
  description: string;
  tagline: string;
  url: string;
  technologies: string;
  tags: string;
  collaboration: string;
}


const UploadProject:NextPage = () => {
  useEffect(() => {
    if(localStorage.getItem('token') === null) {
      Router.replace('/');
    }
  }, []);

  const api = new ApiService();
  const [componentSize, setComponentSize] = useState('medium');
  const [technologiesSelect, setTechnologiesSelect] = useState<string[]>([]);
  const [tagSelect, setTagSelect] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [fileList, setFileList] = useState<string[]>([]);              // list of files uploaded locally used by antd
  const [fileListUpload, setFileListUpload] = useState<any[]>([]);    // list of files uploaded to cloduinary
  const [inputName, setInputName] = useState<string>('');
  const [inputTagline, setInputTagline] = useState<string>('');
  const [inputWebsite, setInputWebsite] = useState<string>('');
  const [inputDesc, setInputDesc] = useState<string>('');

  const { Option } = Select;

  const technologies = ['React', 'Angular', 'ASP.NET', 'Node/Express', 'Vue', 'Django','Flask', 'Laravel', 'Ruby on Rails', 'Drupal'];
  const childrenTech = [];
  for (let i = 0; i < technologies.length; i++) {
    childrenTech.push(<Option key={i} value={i+1}>{technologies[i]}</Option>);
  }
  const tags = ['Productivity', 'Fintech', 'Analytics', 'Sports', 'Music', 'Personal'];
  const childrenTags = [];
  for (let i = 0; i < tags.length; i++) {
    childrenTags.push(<Option key={i} value={i+1}>{tags[i]}</Option>);
  }

  const onFormLayoutChange = ({size}: IFormLayoutChange) => {
    setComponentSize(size);
  };

  const getBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onSelectTechnologyChange = ({value}: ISelectChange) => {
    setTechnologiesSelect(value);
  }

  const onSelectTagChange = ({value}: ISelectChange) => {
    setTagSelect(value);
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: IHandlePreview) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj) as string;
    }

    setPreviewTitle(file.name);
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  }

  const handleOnRemove = ({info, fileList}:IHandleRemove) => {
    let antdIndexPos:number | null = null;
    const removedFileUID = info.uid;

    for(let i = 0; i < fileList.length; i++) {
      if(fileList[i].uid === removedFileUID) {
        antdIndexPos = i;
      }
    }

    setFileListUpload([fileListUpload.slice(0, antdIndexPos!).concat(fileListUpload.slice(antdIndexPos!+1))]);
  }

  const handleOnFinish = async (values: IFields) => {
    const { name, description, tagline, url, technologies, tags, collaboration } = values;
    const form = new FormData()
    form.append('name', name);
    form.append('description', description);
    form.append('tagline', tagline);
    form.append('url', url);
    form.append('technologies', technologies);
    form.append('tags', tags);
    form.append('collaboration', collaboration);
    form.append('screenshots', fileListUpload);
    form.append('user_id', '1');

    const res = await api.createProject(form);
    if(res.status === 200) {
      Router.push('/');
    }
  }

  const handleUploadChange = ({fileList}: IUploadChange) => {
    setFileList(fileList)
  };

  const customRequest = (file: { file: string | Blob; onProgress: (arg0: (e: any) => void) => void; onSuccess: (arg0: (e: any) => void) => void; }) => {
			const data= new FormData()
			data.append('file', file.file)
			const config= {
        method: "POST",
        body: data
      }

			fetch('http://localhost:3000/api/image/upload', config).then((res: any) => {
        return res.json();
			}).then(data => {
        file.onProgress(e => console.log(e));
        file.onSuccess(e => console.log(e));
        
        setFileListUpload([...fileListUpload, data.secure_url]);
      }).catch((err: Error) => {
				console.log(err)
			})	
  }


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Layout>
      <div>
        <Head>
          <title>Upload Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="project-upload-body">
            <Form
              labelCol={{
                span: 28,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="vertical"
              initialValues={{
                size: componentSize,
                collaboration: false,
                technologies: [],
                tags: []
              }}
              onFinish={handleOnFinish as any}
              onValuesChange={onFormLayoutChange as any}
            >
            <Form.Item 
              label="Project Name" 
              name="name" 
              rules={[{required: true, message:'Required'}]}
            >
              <Input 
                value={inputName} 
                onChange={(e)=> setInputName(e.target.value)} 
            />
            </Form.Item>
            <Form.Item 
              label="Tagline" 
              name="tagline" 
              rules={[{required: true, message:'Required'}]}
            >
              <Input 
                value={inputTagline} 
                onChange={(e)=> setInputTagline(e.target.value)}
              />
            </Form.Item>
            <Form.Item 
              name="description" 
              label="Tell us about your project (features, tech stack, motivation)" 
              rules={[{required: true, message:'Required'}]}
            >
              <Input.TextArea 
                value={inputDesc} 
                onChange={(e)=> setInputDesc(e.target.value)}
              />
            </Form.Item>
            <Form.Item 
              label="Website" 
              name="url" 
              rules={[{required: true, message:'Required'}]}
            >
              <Input 
                value={inputWebsite} 
                onChange={(e)=> setInputWebsite(e.target.value)}
              />
            </Form.Item>
            <Form.Item 
              label="Technologies" 
              name="technologies"
              rules={[{required: true, message:'Must select at least one'}]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={onSelectTechnologyChange as any}
              >
                {childrenTech}
              </Select>
            </Form.Item>
            <Form.Item 
              label="Tags" 
              name="tags"
              rules={[{required: true, message:'Must select at least one'}]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={onSelectTagChange as any}
              >
                {childrenTags}
              </Select>
            </Form.Item>
            <Form.Item label={<span>
                    Collaboration&nbsp;
                    <Tooltip title="Are you interested in collaborating with other developers?">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>}
                  name="collaboration"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item label="Add Thumbnail">
              <p>Add a thumbnail(250x250) and a screenshot of your project.</p>
              <div className="clearfix">
                <Upload
                  listType="picture-card"
                  fileList={fileList as any[]}
                  onPreview={handlePreview as any}
                  onChange={handleUploadChange as any}
                  onRemove={handleOnRemove as any}
                  customRequest={customRequest as any}
                >
                  {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </Form.Item>
            <ProjectMain projects={[{
              id: 1,
              name: inputName,
              description: inputDesc,
              tagline: inputTagline,
              url: inputWebsite,
              tags: tagSelect,
              technologies: technologiesSelect,
              collaboration: true,
              created_on: '2020-12-01',
              user_id: 1,
              images: fileListUpload.length >= 1 ? fileListUpload : ['sdf']
            }]}/>
            <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default UploadProject;
