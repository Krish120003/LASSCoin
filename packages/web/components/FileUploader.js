// It's the spelling

export default function FileUploader() {
  return (
    <div>
      <form method="post" action="#" id="#">
        <div className="form-group files">
          <label>Upload Your Private Key File </label>
          <input type="file" className="form-control" multiple="" />
        </div>

        <button> Submit </button>
      </form>
    </div>
  );
}
