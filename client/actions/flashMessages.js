import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './actionTypes';

/**
 * This function displays a flash message to the user
 *
 * @export
 * @param {string} message The message to show to the user
 * @returns {object}
 */
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
}

/**
 * This function deletes a flashmessage via the ID
 *
 * @export
 * @param {number} id The id of the message to delete
 * @returns {object}
 */
export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id,
  };
}
