// ** React Imports
import { useState, Fragment, useEffect } from "react"

// ** Reactstrap Imports
import { Card, CardBody, Button, ListGroup, ListGroupItem, Label } from "reactstrap"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Imports
import { useDropzone } from "react-dropzone"
import { X, DownloadCloud } from "react-feather"
import toast from "react-hot-toast"

const ErrorToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>Error!</h6>
      </div>
      <small className='text-muted'>a second ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 You can only upload image Files!.
      </span>
    </div>
  </Fragment>
)

const FileUploaderLogo = ({title, setlogoUrl, sethederImage}) => {
  // ** State
  const [files, setFiles] = useState([])
  const [bas46, setBase64] = useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "image/*",
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error(<ErrorToast />, { icon: false, hideProgressBar: true })
      } else {
        setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))])
      }
    }
  })

  const getBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }

  console.log(bas46)


  const handleRemoveFile = (file) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i) => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>
          <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        </div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <>
      <Label for='companyName' className='form-label mt-1'>
        {title}
        <span className='text-danger'>*</span>
      </Label>

      <Card>
        <CardBody>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={30} />
              <p className='text-secondary'>فایل را رها کنید یا کلیک کنید</p>
            </div>
          </div>
          {files.length ? (
            <Fragment>
              <ListGroup className='my-2'>{fileList}</ListGroup>
              <div className='d-flex justify-content-end'>
                <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                  حذف
                </Button>
                <Button
                  color='primary'
                  onClick={() => getBase64(files[0], (result) => { 
                    console.log(result)
                    setBase64(result)
                    setlogoUrl(result)
                    sethederImage(result)

                   })
                  }
                >
                  اپلود فایل
                </Button>
              </div>
            </Fragment>
          ) : null}
        </CardBody>
      </Card>
    </>
  )
}

export default FileUploaderLogo
