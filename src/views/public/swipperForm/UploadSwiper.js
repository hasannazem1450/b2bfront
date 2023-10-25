// ** React Imports
import { useState, Fragment, useEffect } from "react"

// ** Reactstrap Imports
import { Card, CardBody, Button, ListGroup, ListGroupItem } from "reactstrap"

// ** Third Party Imports
import { useDropzone } from "react-dropzone"
import { FileText, X, DownloadCloud } from "react-feather"
import Avatar from "@components/avatar"
import toast from "react-hot-toast"

const UploadSwiper = ({ ext, size }) => {
  // ** useState
  const [files, setFiles] = useState([])
  const [acceptFile, setAcceptFile] = useState(null)

  // ** useEffect
  useEffect(() => {
  }, [])

  // ** ErrorToastFunction
  const ErrorToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='danger' icon={<X size={12} />} />
          <h6 className='toast-title'>خطا!</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          👋 حجم فایل های شما نمیتواند بیشتر از (1mb) باشد
        </span>
      </div>
    </Fragment>
  )

  // ** configUseDropzone
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ext ? ext : null,
    onDrop: (acceptedFiles) => {
      setAcceptFile(acceptedFiles)
      if (acceptedFiles[0].size > size) {
        toast.error(<ErrorToast />, { icon: false, hideProgressBar: true })
      } else {
        setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))])
      }
    }
  })

  // ** renderFilePreviewFunction
  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  // ** handleRemoveFileFunction
  const handleRemoveFile = (file) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i) => i.name !== file.name)
    setFiles([...filtered])
  }

  // ** handleRemoveFileFunction
  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  // ** handleRemoveAllFilesFunction
  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  // ** fileListUI
  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
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

  // ** Ui
  return (
    <Card>
      <CardBody>
        {files.length < 1 && (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <p className='text-secondary'>فایل ها را اینجا رها کنید یا کلیک کنید</p>
            </div>
          </div>
        )}
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end mt-1'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                حذف همه
              </Button>
              <Button color='success' onClick={() => uploadFiles()}>
                آپلود فایل
              </Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  )
}

export default UploadSwiper
