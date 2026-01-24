import React, { useEffect, useMemo, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';

const SelectUser = ({ selectedUsers, setSelectedUsers, selectedUser, setSelectedUser }) => {
    const resolvedSelectedUsers = Array.isArray(selectedUsers)
        ? selectedUsers
        : (Array.isArray(selectedUser) ? selectedUser : []);

    const resolvedSetSelectedUsers = typeof setSelectedUsers === 'function'
        ? setSelectedUsers
        : (typeof setSelectedUser === 'function' ? setSelectedUser : null);

    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
            if (Array.isArray(response.data)) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error('Error Fetching Users', error);
        }
    };

    useEffect(() => {
        if (!isModalOpen) return;
        getAllUsers();
    }, [isModalOpen]);

    const openModal = () => {
        setTempSelectedUsers(resolvedSelectedUsers);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => (
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        ));
    };

    const handleAssign = () => {
        if (resolvedSetSelectedUsers) {
            resolvedSetSelectedUsers(tempSelectedUsers);
        }
        setIsModalOpen(false);
    };

    const selectedUserAvatars = useMemo(() => {
        return allUsers
            .filter((user) => resolvedSelectedUsers.includes(user?._id))
            .map((user) => user?.profileImageUrl)
            .filter(Boolean);
    }, [allUsers, resolvedSelectedUsers]);

    return (
        <div>
            <button
                type="button"
                className="form-input flex items-center justify-between"
                onClick={openModal}
            >
                <div className="flex items-center gap-2">
                    {selectedUserAvatars.slice(0, 3).map((url) => (
                        <img
                            key={url}
                            src={url}
                            alt="User"
                            className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                    ))}
                    <span className="text-sm text-slate-700">
                        {resolvedSelectedUsers.length ? `${resolvedSelectedUsers.length} selected` : 'Select users'}
                    </span>
                </div>
                <span className="text-xs text-slate-400">Change</span>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/30"
                        onClick={closeModal}
                        aria-label="Close"
                    />

                    <div className="relative w-[92vw] max-w-lg bg-white rounded-lg shadow-lg border border-gray-200/50 p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-800">Assign Users</h3>
                            <button type="button" className="text-xs text-slate-500" onClick={closeModal}>
                                Close
                            </button>
                        </div>

                        <div className="mt-3 max-h-72 overflow-auto border border-slate-100 rounded">
                            {allUsers.length ? (
                                allUsers.map((user) => {
                                    const userId = user?._id;
                                    const checked = userId ? tempSelectedUsers.includes(userId) : false;
                                    return (
                                        <button
                                            key={userId}
                                            type="button"
                                            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50"
                                            onClick={() => userId && toggleUserSelection(userId)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user?.profileImageUrl || '/default-avatar.png'}
                                                    alt={user?.name || 'User'}
                                                    className="w-8 h-8 rounded-full object-cover border bg-slate-200"
                                                />
                                                <div>
                                                    <div className="text-sm text-slate-800">{user?.name || 'Unnamed'}</div>
                                                    <div className="text-xs text-slate-400">{user?.email || ''}</div>
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded border ${checked ? 'bg-primary border-primary' : 'border-slate-300'}`} />
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="px-3 py-6 text-sm text-slate-500">No users found.</div>
                            )}
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <button type="button" className="card-btn" onClick={closeModal}>
                                Cancel
                            </button>
                            <button type="button" className="btn-primary w-auto px-4" onClick={handleAssign}>
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectUser