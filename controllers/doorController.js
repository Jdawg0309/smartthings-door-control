exports.getAllDoors = (req, res) => {
  // Mock data for doors
  const doors = [
    { id: 1, name: 'Front Door', status: 'locked' },
    { id: 2, name: 'Back Door', status: 'unlocked' },
  ];
  res.status(200).json({ message: 'Doors fetched successfully', data: doors });
};
