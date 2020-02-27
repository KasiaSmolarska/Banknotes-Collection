import { CHANGE_IMAGE_IN_MODAL, BANKNOTE_ERROR } from "./types";
import axios from "axios";

export const changeImageInModal = (image) => async dispatch => {

  try {
    await axios.get(`/api/upload/image/${image}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'image/jpg'
      }
    }).then(response => {
      console.log(response);
      const blob = new Blob([response.data], {
        type: 'image/jpg',
      });
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var data = reader.result;
        console.log(data);
        dispatch({
          type: CHANGE_IMAGE_IN_MODAL,
          payload: data
        })
      }

    })
  } catch (err) {
    dispatch({
      type: BANKNOTE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }

}

