const Address = require("../models/addressModel");



const createAddress = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            governorate,
            city,
            address,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !phone ||
            !governorate ||
            !city ||
            !address
        ) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const addressesCount = await Address.countDocuments({
            user: req.user._id,
        });

        const newAddress = await Address.create({
            user: req.user._id,
            firstName,
            lastName,
            phone,
            governorate,
            city,
            address,
            isDefault: addressesCount === 0,
        });

        res.status(201).json(newAddress);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};


const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const updateAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        const updated = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user._id,
        });
        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }
        const wasDefault = address.isDefault;
        await address.deleteOne();
        if (wasDefault) {
            const remainingAddresses = await Address.find({
                user: req.user._id,
            });
            if (remainingAddresses.length > 0) {
                remainingAddresses[0].isDefault = true;
                await remainingAddresses[0].save();
            }
        }
        const addresses = await Address.find({
        user: req.user._id,
});

res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });
        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }
        await Address.updateMany(
            { user: req.user._id },
            { isDefault: false }
        );
        address.isDefault = true;
        await address.save();
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};