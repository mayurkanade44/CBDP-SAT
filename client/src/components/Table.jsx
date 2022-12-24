const Table = ({ user, th1, th2, th3, data, download, deleteUser }) => {
  return (
    <table className="table table-striped-columns table-bordered mt-2">
      <thead>
        <tr>
          <th style={{width:240}}>{th1}</th>
          <th>{th2}</th>
          <th>{th3}</th>
        </tr>
      </thead>
      <tbody>
        {user
          ? data?.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>
                  {item.role !== "Admin" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(item._id)}
                    >
                      Remove User
                    </button>
                  )}
                </td>
              </tr>
            ))
          : data?.map((item) => (
              <tr key={item._id}>
                <td>{item.contract}</td>
                <td>{item.serviceName}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => download(item.image[0], item.contract)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
export default Table;
